import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { gsapUtils, useGSAP } from '@/hooks/useGSAP';
import { MemberRegistration } from '@/types';

const membershipSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  academicYear: z.enum(['1st', '2nd', '3rd', '4th'], {
    required_error: 'Please select your academic year',
  }),
  programmingExperience: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: 'Please select your programming experience level',
  }),
});

interface JoinClubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinClubModal({ isOpen, onClose }: JoinClubModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isLoaded } = useGSAP();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<MemberRegistration>({
    resolver: zodResolver(membershipSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: MemberRegistration) => {
      return apiRequest('POST', '/api/members', data);
    },
    onSuccess: () => {
      toast({
        title: 'Welcome to CSquare!',
        description: 'Your membership application has been submitted successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/statistics'] });
      reset();
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: 'Registration Failed',
        description: error.message || 'Failed to submit membership application.',
        variant: 'destructive',
      });
    },
  });

  useEffect(() => {
    if (isOpen && isLoaded) {
      // Animate modal content entrance
      setTimeout(() => {
        gsapUtils.scaleIn('.modal-content', 0.1);
        gsapUtils.staggerCards('.form-field', 0.1);
      }, 100);
    }
  }, [isOpen, isLoaded]);

  const onSubmit = (data: MemberRegistration) => {
    mutation.mutate(data);
  };

  const handleClose = () => {
    if (!mutation.isPending) {
      reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="modal-content max-w-md mx-auto" data-testid="modal-join-club">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800 mb-2">
            Join CSquare
          </DialogTitle>
          <p className="text-center text-gray-600" data-testid="text-modal-subtitle">
            Become a member of our competitive programming community
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div className="form-field space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              {...register('name')}
              className="w-full"
              data-testid="input-name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm" data-testid="error-name">{errors.name.message}</p>
            )}
          </div>
          
          <div className="form-field space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@college.edu"
              {...register('email')}
              className="w-full"
              data-testid="input-email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm" data-testid="error-email">{errors.email.message}</p>
            )}
          </div>
          
          <div className="form-field space-y-2">
            <Label htmlFor="rollNumber" className="text-sm font-semibold text-gray-700">
              Roll Number
            </Label>
            <Input
              id="rollNumber"
              placeholder="e.g., 2021CSE001"
              {...register('rollNumber')}
              className="w-full"
              data-testid="input-roll-number"
            />
            {errors.rollNumber && (
              <p className="text-red-500 text-sm" data-testid="error-roll-number">{errors.rollNumber.message}</p>
            )}
          </div>
          
          <div className="form-field space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Academic Year
            </Label>
            <Select 
              onValueChange={(value) => setValue('academicYear', value as any)}
              defaultValue=""
            >
              <SelectTrigger className="w-full" data-testid="select-academic-year">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1st">1st Year</SelectItem>
                <SelectItem value="2nd">2nd Year</SelectItem>
                <SelectItem value="3rd">3rd Year</SelectItem>
                <SelectItem value="4th">4th Year</SelectItem>
              </SelectContent>
            </Select>
            {errors.academicYear && (
              <p className="text-red-500 text-sm" data-testid="error-academic-year">{errors.academicYear.message}</p>
            )}
          </div>
          
          <div className="form-field space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Programming Experience
            </Label>
            <Select 
              onValueChange={(value) => setValue('programmingExperience', value as any)}
              defaultValue=""
            >
              <SelectTrigger className="w-full" data-testid="select-programming-experience">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            {errors.programmingExperience && (
              <p className="text-red-500 text-sm" data-testid="error-programming-experience">{errors.programmingExperience.message}</p>
            )}
          </div>
          
          <div className="flex space-x-4 mt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={handleClose}
              disabled={mutation.isPending}
              data-testid="button-cancel-join"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-redwood text-white hover:bg-red-800 disabled:opacity-50"
              disabled={mutation.isPending}
              data-testid="button-submit-join"
            >
              {mutation.isPending ? 'Joining...' : 'Join CSquare'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
