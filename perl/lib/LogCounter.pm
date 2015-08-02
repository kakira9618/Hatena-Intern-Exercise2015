package LogCounter;
use strict;
use warnings;

sub new {
	my ($class, $logs) = @_;
	return bless { logs => $logs }, $class;
};

sub group_by_user {
	my $self = shift;
	my %result;
	foreach (@{$self->{logs}}) {
		my $user;
		if ($_->{user}) {
			$user = $_->{user};
		} else {
			$user = 'guest';
		}
		if (not exists($result{$user})) {
			$result{$user} = [];
		}
		push @{$result{$user}}, $_;
	}
	return \%result;
}

sub count_error {
	my $self = shift;
	my @errors = grep { $_->{status} =~ /^5/ } @{$self->{logs}};
	return $#errors + 1;
}

1;
